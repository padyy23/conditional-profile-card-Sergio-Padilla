import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true,
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
        socialMediaPosition: "right",
        
        twitter: null,
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables);


  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover === false) cover = "<div class='cover'></div>";


  const fullName = `${variables.name || "Name"} ${variables.lastName || "LastName"}`;


  const role = variables.role || "Role";
  const city = variables.city || "City";
  const country = variables.country || "Country";


  const socialLinks = {
    twitter: variables.twitter ? `https://twitter.com/${variables.twitter}` : null,
    github: variables.github ? `https://github.com/${variables.github}` : null,
    linkedin: variables.linkedin ? `https://linkedin.com/in/${variables.linkedin}` : null,
    instagram: variables.instagram ? `https://instagram.com/${variables.instagram}` : null
  };

  let socialHTML = "";
  for (let [key, url] of Object.entries(socialLinks)) {
    if (url) {
      socialHTML += `<li><a href="${url}"><i class="fab fa-${key}"></i></a></li>`;
    }
  }


  const positionClass = variables.socialMediaPosition || "position-right";


  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${fullName}</h1>
      <h2>${role}</h2>
      <h3>${city}, ${country}</h3>
      <ul class="${positionClass}">
        ${socialHTML}
      </ul>
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};

