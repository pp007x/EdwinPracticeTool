import React, { useState } from 'react';
import yaml from 'js-yaml';
import config from '../../config';
import DashboardSidebar from './AdminSidebar';
import styles from '../../Css/Dashboard.module.css';

const Header = ({ title }) => (
  <div className={styles.header}>
    <hr />
    <div className={styles["page-title"]}>{title}</div>
  </div>
);

function AdminNewQuestion() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            const yamlText = e.target.result;
            const questions = yaml.load(yamlText);
            setQuestions(questions);

            try {
                const response = await fetch(`${config.API_BASE_URL}/api/YamlUpload`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(questions)
                });

                if (response.ok) {
                    alert("Data successfully uploaded");
                } else {
                    alert("Failed to upload data");
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className={styles.dashboard}>
          <DashboardSidebar />
          <div className={styles.main}>
            <Header title="Admin New Question" />
            <input type="file" onChange={handleFileUpload} disabled={loading} />
            {/* Render your questions here */}
          </div>
        </div>
    );
}

export default AdminNewQuestion;
