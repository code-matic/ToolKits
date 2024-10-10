const UserGuidePage = () => {
  return (
    <div className="user-guide p-4 mb-6 rounded-lg bg-[#FFFFFF]">
      <h2 className="text-lg font-bold mb-3">User Guide</h2>
      <p>
        Welcome to the configuration page. Below is a brief description of each dynamic value used in the application and what it should be replaced with:
      </p>
      
      <ul className="space-y-6">
        <li className="relative pl-6 mt-6">
          <span className="absolute left-0 top-0">›</span>
          <strong>envBucketUrl</strong>: Replace with the URL path to the location in the storage bucket that your env file is located.
          (e.g., <code>envs_store_dev/parentyn/backend</code>).
        </li>
        <p className="mt-4 pl-6"><strong>How to get your envBucketUrl</strong>:</p>
        <ol className="list-decimal list-inside ml-4 pl-6">
          <li>
            Navigate to cloud storage here: 
            <a
              href="https://console.cloud.google.com/storage/browser?referrer=search&project=codematic-shared-environment&prefix=&forceOnBucketsSortingFiltering=true"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-blue-600"
            >
               Cloud Storage
            </a>
          </li>
          <li>Confirm that you are in the right project and either create a bucket for your .env file or use an existing bucket.</li>
          <li className="mb-10">
            Click the copy button in the highlighted section of this picture to retrieve your <strong>envBucketUrl</strong>:
            <img
              src="https://storage.googleapis.com/toolkit-cloudbuild-generator/Copying%20envBucketUrl%20path.png"
              alt="Copying envBucketUrl"
              className="mt-6 rounded-lg border-black border-4"
            />
          </li>

        </ol>

        <li className="relative pl-6">
          <span className="absolute left-0 top-0">›</span>
          <strong>migrationScriptPath</strong>: Replace with the path to your migration script and the name of your migration script (e.g., <code>./migrate.sh</code> or <code>./backend/job.sh</code>).
          <p className="mt-4">
            <strong><em>N.B. The Migration step in the backend configuration is optional and only applies if you are running a Backend application relying on SQL databases.</em></strong>
          </p>


          <p className="mt-4"><strong>How to set up and get your migrationScriptPath</strong>:</p>
          <ol className="list-decimal list-inside ml-4 mt-4 space-y-3">
            <li>Create a migration script in your project.</li>
            <li>
              Sample migration script:
              <pre className="mt-2 bg-gray-200 p-2 rounded">
                <code>
                  #!/usr/bin/env sh{'\n'}
                  set -x{'\n'}
                  python3 manage.py makemigrations{'\n'}
                  python3 manage.py migrate{'\n'}
                </code>
              </pre>
              Your migration script will simply include the commands you run to make migrations (e.g., <code>yarn run migrations</code>).
            </li>
            <li>
              Make the script executable by running <code>chmod +x job.sh</code>. Replace <code>job.sh</code> with the name of your script.
            </li>
            <li>
              The relative link to the file is your <strong>migrationScriptPath</strong> (e.g., <code>./backend/job.sh</code> or <code>./job.sh</code>).
            </li>
          </ol>
        </li>

        {/* Other list items */}
        <li className="relative pl-6">
          <span className="absolute left-0 top-0">›</span>
          <strong>projectId</strong>: Replace with your project's ID (e.g., <code>codematic-shared-environment</code>).
        </li>
        <li className="relative pl-6">
          <span className="absolute left-0 top-0">›</span>
          <strong>appProjectName</strong>: Replace with the name of your app's project (e.g., <code>parentyn</code>, <code>puravida</code>).
        </li>
        <li className="relative pl-6">
          <span className="absolute left-0 top-0">›</span>
          <strong>applicationName</strong>: Replace with the name of your application (e.g., <code>backend</code>, <code>admin</code>, <code>agent</code>, <code>frontend</code>).
        </li>
        <li className="relative pl-6">
          <span className="absolute left-0 top-0">›</span>
          <strong>dockerFilePath</strong>: Replace with the path to your Dockerfile. (e.g., <code>./codeblock-toolkit/Dockerfile</code>, <code>./Dockerfile</code>)
        </li>
        <li className="relative pl-6">
          <span className="absolute left-0 top-0">›</span>
          <strong>region</strong>: Replace with the region where your resources are deployed (e.g., <code>europe-west1</code>).
        </li>
        <li className="relative pl-6">
          <span className="absolute left-0 top-0">›</span>
          <strong>environment</strong>: Replace with the environment type (e.g., <code>development</code>, <code>production</code>).
        </li>
      </ul>
    </div>
  );
};

export default UserGuidePage;
