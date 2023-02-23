//This will pull and sort an array of open source projects I've commited to and list them based on number of stars

//This is the array of projects I've commited to
var projects = [
  {
    link: "github/docs",
    pr: "https://github.com/github/docs/pull/23958",
  },
  {
    link: "shadcn/ui",
    pr: "https://github.com/shadcn/ui/pull/102",
  },
  {
    link: "drjekyllthemes/themes",
    pr: "https://github.com/drjekyllthemes/themes/pull/159",
  },
];

//List out the projects
projects.forEach((project) => {
  //Get the number of stars
  fetch(`https://api.github.com/repos/${project.link}`)
    .then((response) => response.json())
    .then((data) => {
      //Add the number of stars to the project object
      project.stars = data.stargazers_count;
      //Add avatar to the project object
      project.avatar = data.owner.avatar_url;
      //Sort projects by the amount of stars
      projects.sort((a, b) => b.stars - a.stars);

      project.cleanStars = project.stars.toLocaleString("en-US");
      //Sort the projects based on number of stars
      //Only list the first 4 projects
      projects = projects.slice(0, 4);
      //List out the projects
      document.getElementById(
        "projects"
      ).innerHTML += `<article style="margin:0;" class="text-center"><div><a target="_blank" class="external-link" href="https://github.com/${project.link}">${project.link} </a></div><p>${project.cleanStars} &#11088;</p><img alt="${project.link} avatar from github" class="pr-images" src="${project.avatar}" /></article>`;
    });
});
