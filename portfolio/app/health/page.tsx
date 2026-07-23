async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function HealthPage() {
  const data = await getData();

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6">Health Check</h1>

      <div className="border rounded-lg p-6 shadow-md">
        <p>
          <strong>ID:</strong> {data.id}
        </p>

        <p>
          <strong>Title:</strong> {data.title}
        </p>

        <p>
          <strong>Completed:</strong> {data.completed ? "Yes" : "No"}
        </p>
      </div>
    </main>
  );
}