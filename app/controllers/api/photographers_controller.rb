# app/controllers/api/v1/photographers_controller.rb

module Api
  module V1
    class PhotographersController < ApplicationController
      before_action :set_photographer, only: %i[show update destroy]

      # GET /api/v1/photographers
      def index
        @photographers = Photographer.all
        render json: @photographers
      end

      # POST /api/v1/photographers
      def create
        @photographer = Photographer.new(photographer_params)
        if @photographer.save
          render json: @photographer, status: :created
        else
          render json: @photographer.errors, status: :unprocessable_entity
        end
      end

      # GET /api/v1/photographers/:id
      def show
        render json: @photographer
      end

      # PUT /api/v1/photographers/:id
      def update
        if @photographer.update(photographer_params)
          render json: @photographer
        else
          render json: @photographer.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/photographers/:id
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
