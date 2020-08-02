module Api::V1
  class HighScoresController < ApplicationController
  
    # GET /high_scores
    def index
      @high_scores = HighScore.all
  
      render json: @high_scores
    end
  
    # POST /high_scores
    def create
      @high_score = HighScore.new(high_score_params)
  
      if @high_score.save
        render json: @high_score, status: :created
      else
        render json: @high_score.errors, status: :unprocessable_entity
      end
    end
  
    private  
      # Only allow a trusted parameter "white list" through.
      def high_score_params
        params.require(:high_score).permit(:name, :score)
      end
  end

end