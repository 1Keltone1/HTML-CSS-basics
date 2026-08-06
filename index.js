const forumLatest = 'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Back-End Development', className: 'backend' }
};

function timeAgo(timestamp) {
  const currentTime = new Date().getTime();
  const givenTime = new Date(timestamp).getTime();
  const diff = currentTime - givenTime;
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}m ago`;
  }
  if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}h ago`;
  } 
  return `${Math.floor(diff / 86400000)}d ago`;
}

function viewCount(number) {
  if (number >= 1000) {
    return `${Math.floor(number / 1000)}k`;
  }
  return number;
}

function forumCategory(id) {
  if (allCategories.hasOwnProperty(id)) {
    const result = `<a class="category ${allCategories[id]["className"]}" href="${forumCategoryUrl}${allCategories[id]["className"]}/${id}">${allCategories[id]["category"]}</a>`;
    return result;
  }
  const result = `<a class="category general" href="${forumCategoryUrl}general/${id}">General</a>`;
  return result;
}


function avatars(posters, users) {
  let htmlString = ``;
  for (let i = 0; i < posters.length; i++) {
    let user = null;
    for (let j = 0; j < users.length; j++) {
      if (users[j].id === posters[i]["user_id"]) {
        user = users[j];
        break
      }
    }
    if (user){
      let avatar_template = user["avatar_template"].replace("{size}", "30");
      let imgTag = '';
      if (user["avatar_template"][0] === "/") {
        imgTag = `<img src="${avatarUrl}${avatar_template}" alt="${user.name}">`
      } else {
        imgTag = `<img src="${avatar_template}" alt="${user.name}">`
      }
      htmlString += imgTag;
    }
  }
  return htmlString;
}

const tableBody = document.getElementById("posts-container");

function showLatestPosts(data) {
  const users = data.users;
  const topics = data["topic_list"].topics;
  let result = ``;
  for (let i = 0; i < topics.length; i++) {
    let tableRow = `
      <tr>
        <td>
          <a class="post-title" href="${forumTopicUrl}${topics[i].slug}/${topics[i].id}">${topics[i].title}</a>
          ${forumCategory(topics[i]["category_id"])} 
        </td>
        <td>
          <div class="avatar-container">
            ${avatars(topics[i].posters, users)}
          </div>
        </td>
        <td>
          ${topics[i]["posts_count"] - 1}
        </td>
        <td>
          ${viewCount(topics[i].views)}
        </td>
        <td>
          ${timeAgo(topics[i]["bumped_at"])}
        </td>
      </tr>`
    result += tableRow;
  }
  tableBody.innerHTML = result;
}

async function fetchData() {
  try {
    let response = await fetch(forumLatest);
    let data = await response.json();
    showLatestPosts(data);
  } catch(error) {
    console.log(error);
  }
}

fetchData();