$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="chat">
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
    `<div class="chat">
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

  $(".chat-main__message-form").on("submit", function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
      })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__body').append(html);
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight})
      $('form')[0].reset();
      })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    });

    });
});