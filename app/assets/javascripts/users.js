$(function() {
  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  if( $('.group_json').val() ) {
    var memberJson = $('.group_json').val();
    var member = JSON.parse(memberJson);
    member.forEach(function(user){
      removeUser(user);
    });
  }
  function NoUser(notice) {
    var noUserHtml = `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">${ notice }</p>
                      </div>`
    search_list.append(noUserHtml);
  }
  function addUserToSearch(user) {
    var searchHtml = `<div class="chat-group-user clearfix add-user-${ user.id }">
                        <p class="chat-group-user__name">${ user.name }</p>
                        <a class="add-${ user.id } user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                      </div>`
    search_list.append(searchHtml);
    moveUser(user);
  }
  function moveUser(user) {
    $(`.add-${ user.id }`).on('click', function(){
      addUserToMember(user);
      $(`.add-user-${ user.id }`).remove();
    });
  }
  function addUserToMember(user) {
    var memberHtml = `<div class='chat-group-user clearfix js-chat-member remove-user-${ user.id }' id='chat-group-user-${ user.id }'>
                        <input name='group[user_ids][]' type='hidden' value='${ user.id }'>
                        <p class='chat-group-user__name'>${ user.name }</p>
                        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn remove-${ user.id }' data-user-id='${ user.id }' data-user-name='${ user.name }'>削除</a>
                      </div>`
    member_list.append(memberHtml);
    removeUser(user);
  }
  function removeUser(user) {
    var removeBtn = '.remove-' + user.id
    var removeUser = '.remove-user-' +  user.id
    $(`.remove-${ user.id }`).on('click', function(){
      $(`.remove-user-${ user.id }`).remove();
    });
  }
  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
  })
  .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input) {
        users.forEach(function(user){
        addUserToSearch(user);
        removeUser(user);
        });
      }
      else {
        NoUser("一致するユーザーがいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })
});
