import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

import * as sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = functions.config().sendgrid.key;
cosnt TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(SENDGRID_API_KEY);


// export const newInventoryEmail = functions.auth.user().