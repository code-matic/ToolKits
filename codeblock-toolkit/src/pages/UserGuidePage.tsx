
const UserGuidePage = () => {
  return (
    <div className="user-guide p-4 mb-6 border border-gray-300 rounded-lg bg-gray-100">
      <h2 className="text-lg font-bold mb-3">User Guide</h2>
      <p>
        Welcome to the configuration page. Below is a brief description of each dynamic value used in the application and what it should be replaced with:
      </p>
      <ul className="list-disc list-inside">
        <li><strong>envBucketUrl</strong>: Replace with the URL path to the location in the storage bucket that your env file is located. (Eg. envs_store_dev/parentyn/backend)</li>
        <li><strong>projectId</strong>: Replace with your project's ID. Eg. codematic-shared-environment</li>
        <li><strong>appProjectName</strong>: Replace with the name of your app's project. (Eg. parentyn, puravida)</li>
        <li><strong>applicationName</strong>: Replace with the name of your application. (Eg. backend, admin, agent, frontend)</li>
        <li><strong>dockerFilePath</strong>: Replace with the path to your dockerfile. If your dockerfile is at the root of your application, delete the present content and leave this field blank.</li>
        <li><strong>region</strong>: Replace with the region your resources are deployed in. (Eg. europe-west1)</li>
        <li><strong>environment</strong>: Replace with the environment type (e.g., development, production).</li>
        
        
      </ul>
    </div>
  );
};

export default UserGuidePage;
