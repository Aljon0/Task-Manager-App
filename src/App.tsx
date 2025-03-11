import Dashboard from "./components/Dashboard";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div
        className="min-h-screen bg-slate-50"
        style={{ backgroundColor: "#F8F8F8" }}
      >
        <Dashboard />
      </div>
    </TaskProvider>
  );
}

export default App;
