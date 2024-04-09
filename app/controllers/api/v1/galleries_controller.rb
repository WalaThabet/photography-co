# frozen_string_literal: true

module Api
  module V1
    class GalleriesController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :find_photographer
      before_action :set_gallery, only: %i[show update destroy]

      def index
        @galleries = Gallery.includes(:photographer).all
        galleries_with_urls = @galleries.map do |gallery|
          gallery.as_json(include: [:photographer]).merge(cover_image_url: gallery.cover_image_url)
        end
        render json: galleries_with_urls
      end

      def create
        @gallery = Gallery.new(gallery_params)
        @gallery.photographer = @photographer
        if @gallery.save
          render json: @gallery.as_json(methods: [:cover_image_url]), status: :created
        else
          render json: @gallery.errors, status: :unprocessable_entity
        end
      end

      def show
        render json: @gallery, methods: [:cover_image_url]
      end

      def update
        if @gallery.update(gallery_params)
          render json: @gallery
        else
          render json: @gallery.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @gallery.destroy
        head :no_content
      end

      private

      def set_gallery
        @gallery = Gallery.find(params[:id])
      end

      def find_photographer
        @photographer = Photographer.find(params[:photographer_id])
      end

      def gallery_params
        params.require(:gallery).permit(:title, :description, :photographer_id, :cover_image)
      end
    end
  end
end
