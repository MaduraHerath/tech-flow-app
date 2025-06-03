import useRole from "../hooks/useRole";

const AnalyticsPage = () => {

     const { hasRole } = useRole();

  if (!hasRole(['admin'])) {
    return <div>Access Denied</div>;
  }

  return <div>Welcome Admin/Manager!</div>;
    
}

export default  AnalyticsPage;