# app/controllers/api/v1/photos_controller.rb

module Api
  module V1
    class PhotosController < ApplicationController
      before_action :set_photo, only: %i[show update destroy]

      # GET /api/v1/photos
      def index
        @photos = Photo.with_attached_image.all
        render json: @photos.map { |photo|
          photo.as_json.merge({ image_url: url_for(photo.image) })
        }
      end

      # POST /api/v1/photos
      def create
        @photo = Photo.new(photo_params)

        if @photo.save
          @photo.image.attach(params[:photo][:image])
          render json: @photo.as_json.merge({ image_url: url_for(@photo.image) }), status: :created
        else
          render json: @photo.errors, status: :unprocessable_entity
        end
      end

      # GET /api/v1/photos/:id
      def show
        render json: @photo.as_json.merge({ image_url: url_for(@photo.image) })
      end

      # PATCH/PUT /api/v1/photos/:id
      def update
        if @photo.update(photo_params)
          render json: @photo
        else
          render json: @photo.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/photos/:id
      def destroy
        @photo.destroy
        head :no_content
      end

      private

      def set_photo
        @photo = Photo.find(params[:id])
      end

      def photo_params
        params.require(:photo).permit(:title, :description, :gallery_id)
      end
    end
  end
end
