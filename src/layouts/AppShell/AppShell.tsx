import { ChevronDown, ChevronUp, FolderOpen, LayoutDashboard, Plus, UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { assetPaths } from '../../assets/paths';
import { NewProjectModal } from '../../components/project/NewProjectModal';
import { listDemoProjects, projectsChangedEvent } from '../../mocks/projectStore';
import styles from './AppShell.module.css';

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const projectActive = location.pathname.startsWith('/projects');
  const [projects, setProjects] = useState(listDemoProjects);
  const [newProjectOpen, setNewProjectOpen] = useState(false);

  useEffect(() => {
    const refreshProjects = () => setProjects(listDemoProjects());
    window.addEventListener(projectsChangedEvent, refreshProjects);
    return () => window.removeEventListener(projectsChangedEvent, refreshProjects);
  }, []);
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.brand}>
            <img src={assetPaths.logo} alt="Armoury Quest" />
          </div>
          <nav className={styles.nav} aria-label="Primary navigation">
            <div className={`${styles.navGroup} ${projectActive ? styles.groupActive : ''}`}>
              <div className={styles.navGroupTitle}>
                <FolderOpen size={21} strokeWidth={2.1} />
                <span>Projects</span>
                {projectActive ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
              </div>
              <div className={styles.projectLinks}>
                {projects.map((project) => <NavLink key={project.id} to={`/projects/${project.id}`} className={({ isActive }) => `${styles.projectLink} ${isActive ? styles.activeProject : ''}`}>
                  <span className={styles.projectDot} />
                  <span>{project.name}</span>
                </NavLink>)}
                <button className={styles.newProject} type="button" onClick={() => setNewProjectOpen(true)}><Plus size={19} /> New project</button>
              </div>
            </div>
            <NavLink to="/dashboard" end className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
              <LayoutDashboard size={22} strokeWidth={2.1} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/teams" end className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
              <UsersRound size={23} strokeWidth={2.1} />
              <span>Teams</span>
            </NavLink>
          </nav>
        </div>
        <div className={styles.userSummary}>
          <span className={styles.avatar}>AC</span>
          <span><strong>Amanda Chen</strong><small>Learner</small></span>
          <span className={styles.chevron}>›</span>
        </div>
      </aside>
      <main className={styles.content}><Outlet /></main>
      {newProjectOpen && <NewProjectModal onClose={() => setNewProjectOpen(false)} onCreated={(projectId) => { setNewProjectOpen(false); navigate(`/projects/${projectId}`); }} />}
    </div>
  );
}
