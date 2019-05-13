$('#nomalBtn').click(() => {
  location.href = "/bitcamp-team-project/html/auth/consent.html"
  window.localStorage.who = "nomal";
});

$('#companyBtn').click(() => {
  window.localStorage.who = "company";
  location.href = "/bitcamp-team-project/html/auth/consent2.html"
});