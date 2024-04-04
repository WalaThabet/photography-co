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

      def dashboard
        @photographer = Photographer.find(params[:id])
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
        # Find the photographer by params[:id]
        # Use 'includes' to preload galleries
        @photographer = Photographer.includes(:galleries).find(params[:id])

        # If you have jbuilder or similar, you might respond with a view
        # Otherwise, you can directly render json:
        render json: @photographer.to_json(include: :galleries)
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
