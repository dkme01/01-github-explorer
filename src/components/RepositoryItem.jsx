export function RepositoryItem({ repository }) {
  return (
    <li>
      <strong>{repository.name ?? "Default"}</strong>
      <p>{repository.description ?? "Default Repository"}</p>
      <a href={repository.link ?? "#"}>Acessar repositório</a>
    </li>
  );
}
