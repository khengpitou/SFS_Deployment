import course from '@/components/partials/app/academic-service-all/store';
import department from '@/components/partials/app/department-service/store.js';
import profile from '@/components/partials/app/profile-service/store';
import user from '@/components/partials/app/user-service/store';
import auth from '@/components/partials/auth/store';

import layout from './layoutReducer';

const rootReducer = {
	layout,
	auth,
	user,
	profile,
	course: course[0].course,
	batch: course[0].batch,
	semester: course[0].semester,
	department,
};
export default rootReducer;
