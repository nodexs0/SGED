// Importamos React
import React from 'react';
import { useAuth } from '../auth';

// Definimos nuestro componente funcional BodyComponent
const BodyComponent = () => {

    const { user, IsDocente, IsAlumno } = useAuth();

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#fbf8f9] group/design-root overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
            <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div className="@container">
                <div className="@[480px]:p-4">
                    <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://www.jornada.com.mx/ndjsimg/images/jornada/jornadaimg/autoridades-del-ipn-dialogan-con-alumnos-de-upiig-sobre-pliego-petitorio-243/9-12-autoridades-del-ipn-dialogan-con-alumnos-de-upiig-sobre-pliego-petitorio-243html-upiigpng-8920html-60fa6f9a-381c-40f7-a91b-587f121ae513.png")' }}>
                    <div className="flex flex-col gap-2 text-left">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">Sistema de Administración Escolar                    </h1>
                        <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">Es la herramienta informática diseñada para apoyar en la consulta y atención de trámites escolares.</h2>
                    </div>
                    </div>
                </div>
                {!user && (
                    <h1>Bienvenido a la página de inicio!</h1>
                )}
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#e6d0d4] bg-[#fbf8f9] p-4 flex-col">
                    <div className="text-[#1b0e10]" data-icon="Clock" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
                    </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                    <h2 className="text-[#1b0e10] text-base font-bold leading-tight">Enrollments</h2>
                    <p className="text-[#964f5a] text-sm font-normal leading-normal">View your class schedule and enrollments</p>
                    </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#e6d0d4] bg-[#fbf8f9] p-4 flex-col">
                    <div className="text-[#1b0e10]" data-icon="Book" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M160,40V216a8,8,0,0,1-4.42,7.18L84,247.31V216a8,8,0,0,1,4.42-7.18L160,184V56L84,24.69A8,8,0,0,0,76,32V63.31L12.42,32.69A8,8,0,0,0,4,40V216a8,8,0,0,0,8,8L84,183.31V216a8,8,0,0,0,8,8L12,248a8,8,0,0,1-4,7.18L4,256a8,8,0,0,1-8-8V32a8,8,0,0,1,4-7.18L76,8.69V40Z"></path>
                    </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                    <h2 className="text-[#1b0e10] text-base font-bold leading-tight">Courses</h2>
                    <p className="text-[#964f5a] text-sm font-normal leading-normal">Explore and manage your courses</p>
                    </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#e6d0d4] bg-[#fbf8f9] p-4 flex-col">
                    <div className="text-[#1b0e10]" data-icon="Megaphone" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,112a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,224,112Zm-96,96a8,8,0,0,0,16,0v-80a8,8,0,0,0-16,0ZM176,48V24a8,8,0,0,0-8-8H88A8,8,0,0,0,80,24v24a8,8,0,0,0,8,8H168A8,8,0,0,0,176,48ZM48,128a8,8,0,0,0,8-8v-8a8,8,0,0,0-16,0v8A8,8,0,0,0,48,128Zm88,88a8,8,0,0,0-16,0v8a8,8,0,0,0,16,0ZM96,56a8,8,0,0,0-8-8H40A8,8,0,0,0,32,56V216a8,8,0,0,0,8,8H88a8,8,0,0,0,8-8V56A8,8,0,0,0,96,56ZM216,72a8,8,0,0,0-8-8H136a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8h72a8,8,0,0,0,8-8Z"></path>
                    </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                    <h2 className="text-[#1b0e10] text-base font-bold leading-tight">Events</h2>
                    <p className="text-[#964f5a] text-sm font-normal leading-normal">Stay updated with campus events</p>
                    </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#e6d0d4] bg-[#fbf8f9] p-4 flex-col">
                    <div className="text-[#1b0e10]" data-icon="User" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,128A72,72,0,1,0,200,200,72.08,72.08,0,0,0,128,128Zm0,112a56,56,0,1,1,56-56A56.06,56.06,0,0,1,128,240ZM128,72A40,40,0,1,0,168,112,40.05,40.05,0,0,0,128,72Z"></path>
                    </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                    <h2 className="text-[#1b0e10] text-base font-bold leading-tight">Profile</h2>
                    <p className="text-[#964f5a] text-sm font-normal leading-normal">Manage your personal information</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            <div className="flex flex-1 gap-3 rounded-lg border border-[#e6d0d4] bg-[#fbf8f9] p-4 flex-col">
                <div className="text-[#1b0e10]" data-icon="Laptop" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M184,216a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V160H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8H200a8,8,0,0,1,8,8V152a8,8,0,0,1-8,8H184ZM72,48v96H184V48ZM216,96H128V208H216Z"></path>
                </svg>
                </div>
                <div className="flex flex-col gap-1">
                <h2 className="text-[#1b0e10] text-base font-bold leading-tight">Technology Resources</h2>
                <p className="text-[#964f5a] text-sm font-normal leading-normal">Explore technology services for faculty and staff</p>
                </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-[#e6d0d4] bg-[#fbf8f9] p-4 flex-col">
                <div className="text-[#1b0e10]" data-icon="Chat" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,8A120,120,0,1,0,248,128,120.14,120.14,0,0,0,128,8ZM128,200a88,88,0,0,1-55.23-19.3A7.91,7.91,0,0,1,75.6,175.09L98.17,152.53A8,8,0,0,1,106.6,160L88,178.6A40,40,0,1,0,80,128a8,8,0,0,1-16,0A56,56,0,1,1,128,184a8,8,0,0,1,0,16ZM168,128a8,8,0,0,1-16,0,24,24,0,0,0-24-24H96a8,8,0,0,1,0-16h32a40,40,0,0,1,40,40Z"></path>
                </svg>
                </div>
                <div className="flex flex-col gap-1">
                <h2 className="text-[#1b0e10] text-base font-bold leading-tight">Reglamento</h2>
                <a href='https://www.ipn.mx/normatividad/'><p className="text-[#964f5a] text-sm font-normal leading-normal">Normatividad Institucional</p></a>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

// Exportamos nuestro componente para poder ser utilizado en otras partes de la aplicación
export default BodyComponent;
