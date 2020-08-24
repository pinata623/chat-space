$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="chat" data-message-id=${message.id}>
        <div class="chat__top">
          <div class="member-name">
            ${message.user_name}
          </div>
          <div class="chat-time">
            ${message.created_at}
          </div>
        </div>
        <div class="chat__body">
          <p class="M_content">
            ${message.content}
          </p>
          <img class="M_image" src="${message.image}">
        </div>
      </div>`
      return html;
    } else {
      let html =
      `<div class="chat" data-message-id=${message.id}>
        <div class="chat__top">
          <div class="member-name">
            ${message.user_name}
          </div>
          <div class="chat-time">
            ${message.created_at}
          </div>
        </div>
        <div class="chat__body">
          <p class="M_content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.chat:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',  //同期通信でいう『HTTPメソッド』
      data: {id: last_message_id},  
      dataType: 'json',
    })
    .done(function(messages){
      if (messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i,message){
          insertHTML += buildHTML(message)
        });
        $(".chat-main__body").append(insertHTML);
        $(".chat-main__body").animate({ scrollTop: $('.chat-main__body')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});