# frozen_string_literal: true

module Api
  module V1
    class PhotographersController < ApplicationController
      before_action :set_photographer, only: %i[show update destroy]

      def index
        @photographers = Photographer.all
        render json: @photographers
      end

      def dashboard
        @photographer = Photographer.find(params[:id])
      end

      def create
        @photographer = Photographer.new(photographer_params)
        if @photographer.save
          render json: @photographer, status: :created
        else
          render json: @photographer.errors, status: :unprocessable_entity
        end
      end

      def show
        @photographer = Photographer.includes(:galleries).find(params[:id])

        render json: @photographer.to_json(include: :galleries)
      end

      def update
        if @photographer.update(photographer_params)
          render json: @photographer
        else
          render json: @photographer.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @photographer.destroy
        head :no_content
      end

      private

      def set_photographer
        @photographer = Photographer.find(params[:id])
      end

      def photographer_params
        params.require(:photographer).permit(:name, :bio)
      end
    end
  end
end
