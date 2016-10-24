// get me some sockets
var socket = io();

// client side limits
var messages_before_culling = 200;

// some client side caching
var messages_element = $('#messages');
var name_element = $('#name');
var compose_element = $('#compose');

// handle the message compose form
$('form').submit(function() {
    // let's craft a message object
    var message = {
        name: name_element.val(),
        content: compose_element.val(),
    };

    // send along the message
    socket.emit('chat message', message);

    // wipe the slate clean, start again
    compose_element.val('');
    compose_element.focus();

    // and pretend it never happened...
    return false;
});

// a helper function for cleaning up the messages DOM list
function cleanup_messages() {
    // let's get rid of some of these DOM children so we don't have thousands hanging around
    var messages_children = messages_element.children();
    var messages_length = messages_children.length;
    if (messages_length > messages_before_culling) {
        var messages_to_remove = messages_length - messages_before_culling;
        for (var i = 0; i < messages_to_remove; i++) {
            messages_children[i].remove();
        }
    }
}

// when a chat messages arrives, plop it into the list of messages in the DOM
socket.on('chat message', function(msg) {
    // our shitty message template
    var new_message = '<div class="message-container"><span class="message-name">' + msg.name + '</span> <span class="message-content">' + msg.content + '</span></div>';

    // add the new message to the messages list in the DOM
    messages_element.append(new_message);

    // after adding to the DOM, animate to the bottom of the messages list
    messages_element.animate({
        scrollTop: messages_element.prop('scrollHeight')
    }, 300);

    // clean up the messages DOM
    cleanup_messages();
});

// at the start, set the person's name to something random, for fun
var starting_identifier = Math.round(Math.random() * 100000);
name_element.val('anon' + starting_identifier);

// give the compose field focus so we can start chattin'
compose_element.focus();
