class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json { @new_message = Message.where( "id > ? AND group_id = ?", "#{params[:message][:id]}" ,"#{@group.id}" )}
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html{ redirect_to group_messages_path(params[:group_id]), notice: 'メッセージを送信しました' }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = '送信できませんでした'
      render :message
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
