import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children, ...sidebarProps }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      <Sidebar {...sidebarProps} />
      <main className="flex min-w-0 flex-1 flex-col">
        <Header />

        <section className="min-h-0 flex-1">
          {children}
        </section>
      </main>
    </div>
  );
}

export default MainLayout;