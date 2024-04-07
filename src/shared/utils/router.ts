import { BlockClass } from '../types';
import { Route } from './route';

class Router {
    static __instance: Router;
    private routes: Array<Route> = [];
    private history: History = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery: string | null = null;

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = null;

        Router.__instance = this;
    }

    use(pathname: string, block: BlockClass<unknown>) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            if (event.currentTarget) {
                this._onRoute(window.location.pathname);
            }
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) return;

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

export const router = new Router();
