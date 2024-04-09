# frozen_string_literal: true

# app/controllers/api/v1/photos_controller.rb

module Api
  module V1
    class PhotosController < ApplicationController
      before_action :set_photo, only: %i[show update destroy]
      before_action :find_gallery

      def index
        @photos = Photo.with_attached_image.all
        photo_with_urls = @photos.map do |photo|
          photo.as_json.merge(photo: gallery.image_url)
        end
        render json: photo_with_urls
      end

      def create
        @photo = Photo.new(photo_params)
        @photo.gallery = @gallery
        if @photo.save
          @photo.image.attach(params[:photo][:image])
          render json: @photo.as_json.merge({ image_url: url_for(@photo.image) }), status: :created
        else
          render json: @photo.errors, status: :unprocessable_entity
        end
      end

      def show
        render json: @photo.as_json.merge({ image_url: url_for(@photo.image) })
      end

      def update
        if @photo.update(photo_params)
          render json: @photo
        else
          render json: @photo.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @photo.destroy
        head :no_content
      end

      private

      def set_photo
        @photo = Photo.find(params[:id])
      end

      def find_gallery
        @gallery = Gallery.find(params[:gallery_id])
      end

      def photo_params
        params.require(:photo).permit(:title, :description, :gallery_id, :image)
      end
    end
  end
end
