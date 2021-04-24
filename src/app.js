const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
  {
    id: "10281b61-4ac6-4edb-a289-6efb42bc5412",
    title: "Desafio Node.js",
    url: "https: //github.com/tatianasstavares/goStack-backEnd",
    techs: ["node.js", "typescript"],
    likes: 0,
  },
];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  repoIndex >= 0 ? repoIndex : response.status(400);

  const newRepo = repositories[repoIndex];
  newRepo.title = title ? title : newRepo.title;
  newRepo.url = url ? url : newRepo.url;
  newRepo.techs = techs ? techs : newRepo.techs;

  repositories.splice(repoIndex, 1, newRepo);

  return response.status(204);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  findRepositoryIndex > 0 ? findRepositoryIndex : response.status(400);

  repositories.splice(findRepositoryIndex, 1);

  return response.send("Item deletado");
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "bad request" });
  }

  repositories[repoIndex].likes = repositories[repoIndex].likes + 1;

  return response.json(repositories[repoIndex]);
});

module.exports = app;
