class HighScoresController < ApplicationController
  before_action :set_high_score, only: [:show, :update, :destroy]

  # GET /high_scores
  def index
    @high_scores = HighScore.all

    render json: @high_scores
  end

  # POST /high_scores
  def create
    @high_score = HighScore.new(high_score_params)

    if @high_score.save
      render json: @high_score, status: :created, location: @high_score
    else
      render json: @high_score.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_high_score
      @high_score = HighScore.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def high_score_params
      params.require(:high_score).permit(:name, :score)
    end
end
