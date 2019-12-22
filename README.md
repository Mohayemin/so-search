# SoSearch

The project his hosted at https://so-search.firebaseapp.com/

## Requsted features
- **Question list**: Shows 10 newest and 10 most voted android questions of stackoverflow.com that are created in the past week.
- **Question thread**: Clicking on the title of the question takes to the question thread. The thread includes all answers and all comments. The answers are sorted by most voted first. The the score of accepted answer is marked green.   
Note that, the question thread is not limited to the questions in the question list. Specifying any Stack Overflow question ID in the URL will load that question.

## Additional features
**1. Identify obsolete answers**  
The identification is done based on the paper _"An Empirical Study of Obsolete Answers on Stack Overflow"_ by _Haoxiang Zhang, Shaowei Wang, Tse-Hsun Chen, Ying Zou, Ahmed E Hassan_. The paper uses four keywords - _"deprecated"_, _"outdated"_, _"obsolete"_ and _"out of date"_. For the sake of simplicity, I have considered only one keyword - _"obsolete"_.  

When a question has obsolete answer, it is marked in the question thread.
- The question is marked to have obsolete answers.
- The obsolete answer is marked.
- The question and answers are marked differently based on whether the obsolete answer is accepted or not.
- The comments for which the answer is marked obsolete are also highlighted.

For a demo of this featire, please visit the following questions:
- https://so-search.firebaseapp.com/question/3410222 : This question has a unaccepted obsolete answer.
- https://so-search.firebaseapp.com/question/16138741 : This question has a accepted obsolete answer.
- https://so-search.firebaseapp.com/question/1759352 : Comments of this question talkes about obsolete, but it is not marked because the question itself is about obsolete.
- https://so-search.firebaseapp.com/question/4650462 : One answer is marked obsolete by a comment. However, the answer is not marked because it was edited after the comment was made, possibly fixing the obsolecence. 

**2. Hightlight interesting questions**   
- In the question list, each of the question has a link to answer the question. Clicking the link takes the user to the answer section of the question in Stack Overflow site.
- There is also a link to answer the question in the question thread.
- The links are highligted in 3 different ways based on:
  - The number of answers in the thread.
  - Presence of accepted answer in the thread.

**3. Sorting the question list**  
The question list cane be sorted either by _most voted_ or by _newest_ criteria.

**4. Link to different objects**  
Clicking on various items opens the corresponsding Stack Overflow pages. For example user's name, tag etc.

## Tools and Technologies
- [Angular Framework v8](https://angular.io) as application framework.
- [Stack Exchange API v2.2](https://api.stackexchange.com/) for getting Stack Overflow data.
- [Firebase hosting](https://firebase.google.com/docs/hosting) for hosting the app.

