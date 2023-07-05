import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../Css/CompanyDashboard.module.css'; 
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader'; // create and import a new CSS module for this component
import config from '../../config';

function EditOnderwerp() {
    const [onderwerpen, setOnderwerpen] = useState([]);
    const [selectedOnderwerp, setSelectedOnderwerp] = useState({ id: 0, name: "", description: "" });

    const fetchOnderwerpen = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/Onderwerp`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setOnderwerpen(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOnderwerpen();
    }, []);

    const handleOnderwerpChange = (e) => {
        setSelectedOnderwerp(onderwerpen.find(o => o.id === parseInt(e.target.value)));
    };

    const handleInputChange = (e) => {
        setSelectedOnderwerp({
            ...selectedOnderwerp,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${config.API_BASE_URL}/api/Onderwerp/${selectedOnderwerp.id}`, selectedOnderwerp, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Onderwerp updated successfully!');
            fetchOnderwerpen();  // fetch the list again to get the updated data
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.dashboard}>
        <AdminSidebar />
        <div className={styles.main}>
            <AdminHeader />
            <div className={styles.content}>
                    <h1>Edit Onderwerp</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Onderwerp:
                            <select className={styles.dropdownMenu} name="onderwerpId" value={selectedOnderwerp.id} onChange={handleOnderwerpChange} required>
                                <option value="">Select onderwerp</option>
                                {onderwerpen && onderwerpen.map((onderwerp) => (
                                    <option key={onderwerp.id} value={onderwerp.id}>
                                        {onderwerp.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Name:
                            <input type="text" className={styles.inputField} name="name" value={selectedOnderwerp.name} onChange={handleInputChange} required />
                        </label>
                        <label>
                            Description:
                            <input type="text" className={styles.inputField} name="description" value={selectedOnderwerp.description} onChange={handleInputChange} required />
                        </label>
                        <button type="submit">Update Onderwerp</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditOnderwerp;
