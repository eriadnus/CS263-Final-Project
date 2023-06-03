


export type Team =
    | '76ers'
    | 'Bucks'
    | 'Bulls'
    | 'Cavaliers'
    | 'Celtics'
    | 'Clippers'
    | 'Grizzlies'
    | 'Hawks'
    | 'Heat'
    | 'Hornets'
    | 'Jazz'
    | 'Kings'
    | 'Knicks'
    | 'Lakers'
    | 'Magic'
    | 'Mavericks'
    | 'Nets'
    | 'Nuggets'
    | 'Pacers'
    | 'Pelicans'
    | 'Pistons'
    | 'Raptors'
    | 'Rockets'
    | 'Spurs'
    | 'Suns'
    | 'Thunder'
    | 'Timberwolves'
    | 'Trailblazers'
    | 'Warriors'
    | 'Wizards';

export const TeamLogoUrlMapping = new Map<Team, string>([
    ['76ers', 'https://brandlogos.net/wp-content/uploads/2020/03/philadelphia_76ers-brandlogo.net_.png'],
    ['Bucks', 'https://brandlogos.net/wp-content/uploads/2021/10/milwaukee-bucks-logo.png'],
    ['Bulls', 'https://brandlogos.net/wp-content/uploads/2012/10/chicago-bulls-logo-vector.png'],
    ['Cavaliers', 'https://brandlogos.net/wp-content/uploads/2021/10/cleveland-cavaliers-logo-512x512.png'],
    ['Celtics', 'https://brandlogos.net/wp-content/uploads/2012/10/boston-celtics-logo-vector.png'],
    ['Clippers', 'https://brandlogos.net/wp-content/uploads/2012/12/los-angeles-clippers-logo-vector.png'],
    ['Grizzlies', 'https://brandlogos.net/wp-content/uploads/2021/10/memphis-grizzlies-logo-512x512.png'],
    ['Hawks', 'https://brandlogos.net/wp-content/uploads/2021/10/atlanta-hawks-logo-512x512.png'],
    ['Heat', 'https://brandlogos.net/wp-content/uploads/2012/10/miami-heat-logo-vector.png'],
    ['Hornets', 'https://brandlogos.net/wp-content/uploads/2016/07/charlotte-hornets-logo-preview.png'],
    ['Jazz', 'https://brandlogos.net/wp-content/uploads/2012/10/utah-jazz-logo-vector.png'],
    ['Kings', 'https://brandlogos.net/wp-content/uploads/2021/10/sacramento-kings-logo-512x512.png'],
    ['Knicks', 'https://brandlogos.net/wp-content/uploads/2014/12/new_york_knicks-logo_brandlogos.net_9klcy-512x512.png'],
    ['Lakers', 'https://brandlogos.net/wp-content/uploads/2014/11/los_angeles_lakers-logo_brandlogos.net_hqqxr-512x512.png'],
    ['Magic', 'https://brandlogos.net/wp-content/uploads/2012/12/orlando-magic-logo-vector.png'],
    ['Mavericks', 'https://brandlogos.net/wp-content/uploads/2014/12/dallas-mavericks-logo-512x512.png'],
    ['Nets', 'https://brandlogos.net/wp-content/uploads/2012/10/brooklyn-nets-logo-vector.png'],
    ['Nuggets', 'https://brandlogos.net/wp-content/uploads/2021/10/denver-nuggets-logo-512x512.png'],
    ['Pacers', 'https://brandlogos.net/wp-content/uploads/2021/10/indiana-pacers-logo-512x512.png'],
    ['Pelicans', 'https://brandlogos.net/wp-content/uploads/2016/07/new-orleans-pelicans-vector-logo.png'],
    ['Pistons', 'https://brandlogos.net/wp-content/uploads/2012/10/detroit-pistons-logo-vector.png'],
    ['Raptors', 'https://brandlogos.net/wp-content/uploads/2016/11/toronto-raptors-logo-preview.png'],
    ['Rockets', 'https://brandlogos.net/wp-content/uploads/2021/10/houston-rockets-logo-512x512.png'],
    ['Spurs', 'https://brandlogos.net/wp-content/uploads/2021/10/san-antonio-spurs-logo-512x512.png'],
    ['Suns', 'https://brandlogos.net/wp-content/uploads/2021/10/phoenix-suns-logo-512x512.png'],
    ['Thunder', 'https://brandlogos.net/wp-content/uploads/2012/10/oklahoma-city-thunder-logo-vector.png'],
    ['Timberwolves', 'https://brandlogos.net/wp-content/uploads/2012/11/minnesota-timberwolves-logo-vector.png'],
    ['Trailblazers', 'https://brandlogos.net/wp-content/uploads/2017/05/portland-trail-blazers-logo.png'],
    ['Warriors', 'https://brandlogos.net/wp-content/uploads/2012/12/golden-state-warriors-logo-vector.png'],
    ['Wizards', 'https://brandlogos.net/wp-content/uploads/2021/10/washington-wizards-logo-512x512.png'],
])