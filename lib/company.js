
import { db } from './firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

// Initialize a reference to the single document
const companyDocRef = doc(db, 'companyInfo', 'mainCompanyInfo');

// Function to create or update the document
async function setOrUpdateCompanyInfo(data) {
    try {
        await setDoc(companyDocRef, data, { merge: true });
        console.log('Company information set or updated successfully');
    } catch (error) {
        console.error('Error updating company information:', error);
    }
}


module.exports = { setOrUpdateCompanyInfo };