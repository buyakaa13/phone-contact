import {Router, json} from "express";
import {delete_contact_handler, export_contacts_handler, get_contact_handler, post_contact_handler, update_contact_handler} from '../controllers/handlers';

const router = Router();

router.get('/contacts', get_contact_handler);
router.post('/contacts', json(), post_contact_handler);
router.patch('/contacts/:id', json(), update_contact_handler);
router.delete('/contacts/:id', delete_contact_handler);
router.get('/contacts/export', export_contacts_handler);

export default router;