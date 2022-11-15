import ProtectedRoute from "../components/ProtectedRoute";

const DashboardPage = () => {
    return (
        <ProtectedRoute>
            <div>
                <h2>Perfekt, deine e-mail:</h2>
            </div>
        </ProtectedRoute>
    );
  };
  
  export default DashboardPage;