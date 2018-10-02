$(function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    function buildHTML(message){
      var image = message.image ? `<img src="${message.image}">` : "";
      var html =  `<li class="messages" data-id="${message.id}">
                    <div class="message-list__name">${message.user_name}</div>
                    <div class="message-list__date">${message.date}</div>
                    <div class="message-list__text">${message.content}</div>
                    <div class="message-list__image">` + image + `</div>
                  </li>`
      return html;
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData($(this).get(0));
      var url = $(this).attr('action');
      $('.form__submit__btn').removeAttr('data-disable-with');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.timeline__message-list').append(html);
        $('#new_message')[0].reset();
        $('.main').prepend(`<div class="flash-message-notice">メッセージを送信しました</div>`);
        $(".flash-message-notice").fadeOut(4000).queue(function() {
            this.remove();
        });
        $('.chat-area__timeline').animate({
            scrollTop: $('.chat-area__timeline').get(0).scrollHeight}, 3000);
      })
      .fail(function(){
        $('.main').prepend(`<div class="flash-message-alert">送信できませんでした</div>`);
        $(".flash-message-alert").fadeOut(4000).queue(function() {
            this.remove();
        });
      })
    })
    $(function(){
      messageTimer = setInterval(update, 5000);
    });
    function update(){
      $('.chat-area__timeline').animate({scrollTop:$('.chat-area__timeline').get(0).scrollHeight});
      if( $('.messages')[0] ) {
        var message_id = $('.messages:last').data('id');
      }
      else {
        var message_id = 0
      }
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { message: { id: message_id } },
        dataType: 'json'
      })
      .done(function(data) {
        $.each(data, function(i, data) {
          $('.timeline__message-list').append($(buildHTML(data)));
        });
      })
      .fail(function(){
        clearInterval(messageTimer, 5000);
      })
    }
  }
});
