import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import config from '../../config';
import DashboardSidebar from './AdminSidebar';
import styles from '../../Css/CompanyDashboard.module.css'; 
const Header = ({ title }) => (
  <div className={styles.header}>
    <hr />
    <div className={styles["page-title"]}>{title}</div>
  </div>
);

function AdminNewQuestion() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${config.API_BASE_URL}/api/companies` , {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => setCompanies(data));
    }, []);

    const handleFileUpload = async (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            const yamlText = e.target.result;
            const questions = yaml.load(yamlText);
            questions.forEach(question => question.CompanyId = selectedCompany);
            setQuestions(questions);

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${config.API_BASE_URL}/api/YamlUpload`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',  Authorization: `Bearer ${token}` },
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
                <Header title="Upload questions" />
                <div className={styles.content}>
                    <div className={styles.sidebarRight}>
                        <h1>Add new questions</h1>
                        <label className={styles.label}>Select a company:</label>
                        <div>
                            <select className={styles.dropdownMenu} value={selectedCompany} onChange={event => setSelectedCompany(event.target.value)}>
                                <option value="">Select a company...</option>
                                {companies.map(company => (
                                    <option key={company.id} value={company.id}>{company.name}</option>
                                ))}
                            </select>
                        </div>
                        <input type="file" onChange={handleFileUpload} disabled={loading || !selectedCompany} />
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default AdminNewQuestion;
