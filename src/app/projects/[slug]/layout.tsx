// app/projects/[slug]/layout.js
import ProjectDetailHeader from '@/components/ProjectDetailHeader'

export default function ProjectLayout({ children }) {
    return (
        <>
            <ProjectDetailHeader />
            {children}
        </>
    )
}
