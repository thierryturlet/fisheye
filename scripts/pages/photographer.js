async function main() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log(id);
  let photographer = await getPhotographerById(id);

  console.log(photographer);
}
main();
