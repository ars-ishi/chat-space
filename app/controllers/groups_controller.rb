class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
    # 一番最初のグループが選択されている状態に仮置き
    @group = current_user.groups.first
    @messages = @group.messages
    @message = Message.new
  end

  def new
    @group = Group.new
    @group.users << current_user
    @group_json = @group.users.to_json.html_safe
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to group_messages_path(@group), notice: 'グループを作成しました。'
    else
      render :new
    end
  end

  def edit
    @group_json = @group.users.to_json.html_safe
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:group_name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end

end
