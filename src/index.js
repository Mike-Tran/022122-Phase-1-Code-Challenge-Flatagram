const flatagramAPI = 'http://localhost:3000/images/1';
const cardTitle = document.querySelector('#card-title');
const cardImage = document.querySelector('#card-image');
const cardLikeCount = document.querySelector('#like-count');
const cardLikeBttn = document.querySelector('#like-button');
const cardComments = document.querySelector('#comments-list');
const cardCommentForm = document.querySelector('#comment-form');


fetch(flatagramAPI)
    .then(response => response.json())
    .then(renderCardInformation)
    .catch(console.error);


function renderCardInformation(cardInformation) {
    let likesCount = cardInformation.likes;
    cardTitle.textContent = cardInformation.title;
    cardImage.src = cardInformation.image;
    displayLikes(likesCount);

    clearComments();

    cardInformation.comments.forEach(comment => renderComment(comment));

    cardLikeBttn.addEventListener('click', () => displayLikes(++likesCount));
    cardCommentForm.addEventListener('submit', (e) => addNewComment(e, cardInformation.id));
}

function displayLikes(likesCount) {
    cardLikeCount.textContent = `${likesCount} likes`;
}

function renderComment(comment) {
    const newComment = document.createElement('li');
    newComment.textContent = comment.content;
    cardComments.append(newComment);
}

function addNewComment(event, imageId) {
    event.preventDefault();
    const newComment = {
        "id": Math.random()*100,
        "imageId": imageId,
        "content": cardCommentForm.querySelector('.comment-input').value
    };
    renderComment(newComment);
    cardCommentForm.reset();
}

function clearComments() {
    cardComments.innerHTML = '';
}