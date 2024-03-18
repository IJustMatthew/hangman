import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameRoutes } from './enums/routes.enum';
import { InstructionsComponent } from './views/instructions/instructions.component';

const routes: Routes = [
    {
        path: GameRoutes.Instructions,
        component: InstructionsComponent,
        pathMatch: 'full',
    },
    {
        path: GameRoutes.GameSettings,
        loadChildren: () =>
            import('./views/settings/settings.module').then(
                (m) => m.SettingsModule
            ),
    },
    {
        path: GameRoutes.PlayGame,
        loadChildren: () =>
            import('./views/game/game.module').then((m) => m.GameModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
