export interface IRoute {
    title: string;
    name: string;
    viewNav: boolean;
    children: IRoute[];

}


export const HOME: IRoute = {
    title: 'Inicio',
    name: '/',
    children: [],
    viewNav: true
}

export const HELP: IRoute = {
    title: 'Mesa de ayuda',
    name: '/help',
    children: [],
    viewNav: true
}



export const ROUTES: IRoute[] =[
    HOME,
    HELP
];
