import {requireChatGPTUser} from '../chatgpt-auth';
import Dashboard from './dashboard';
export const dynamic='force-dynamic';
export default async function Page(){const u=await requireChatGPTUser('/teacher');return <Dashboard displayName={u.displayName}/>}

