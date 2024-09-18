import Post from "./components/post";

export default function Home() {
  const dummy = [
    {
      id: 1,
      title: "Lorem Ipsum",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus fugit cupiditate error excepturi, accusantium laudantium repellat suscipit ea porro illo rem dolor culpa nemo aliquid blanditiis. Sequi consectetur dolorum maxime!",
      author: "John Doe",
    },
  ];
  return (
    <section className="mx-auto px-4 py-8 max-w-[800px] container">
      <h1 className="font-bold text-lg text-yellow-500">
        Sign Up and Go Yapping!
      </h1>
      <div className="p-4">
        {dummy.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
