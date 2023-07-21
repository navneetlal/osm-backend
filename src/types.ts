import { Type, Static } from '@sinclair/typebox'

// type AlgorithmTypes = Static<typeof AlgorithmTypes>
// const AlgorithmTypes = Type.Union([
//   Type.Literal('CH'),
//   Type.Literal('CoreCH'),
//   Type.Literal('MLD')
// ])

type GeometriesTypes = Static<typeof GeometriesTypes>
const GeometriesTypes = Type.Union([
  Type.Literal('polyline'),
  Type.Literal('geojson'),
  Type.Literal('polyline6')
])

type OverviewTypes = Static<typeof OverviewTypes>
const OverviewTypes = Type.Union([
  Type.Literal('full'),
  Type.Literal('simplified'),
  Type.Literal('false')
])

type SnappingTypes = Static<typeof SnappingTypes>
const SnappingTypes = Type.Union([Type.Literal('default'), Type.Literal('any')])

type ApproachTypes = Static<typeof ApproachTypes>
const ApproachTypes = Type.Union([
  Type.Literal('unrestricted'),
  Type.Literal('curb')
])

type FallbackCoordinateTypes = Static<typeof FallbackCoordinateTypes>
const FallbackCoordinateTypes = Type.Union([
  Type.Literal('input'),
  Type.Literal('snapped')
])

type GapTypes = Static<typeof GapTypes>
const GapTypes = Type.Union([Type.Literal('split'), Type.Literal('ignore')])

type Coordinate = Static<typeof Coordinate>
const Coordinate = Type.Array(Type.Number())

type Polyline = Static<typeof Polyline>
const Polyline = Type.String()

type Bearing = Static<typeof Bearing>
const Bearing = Type.Array(Type.Number())

type Radius = Static<typeof Radius>
const Radius = Type.Number()

type Hint = Static<typeof Hint>
const Hint = Type.String()

type Duration = Static<typeof Duration>
const Duration = Type.Number()

type Distance = Static<typeof Distance>
const Distance = Type.Number()

type TileType = Static<typeof Tile>
const Tile = Type.Tuple([Type.Number(), Type.Number(), Type.Number()])

type StepManeuverTypes = Static<typeof StepManeuverTypes>
const StepManeuverTypes = Type.Union([
  Type.Literal('turn'),
  Type.Literal('new name'),
  Type.Literal('depart'),
  Type.Literal('arrive'),
  Type.Literal('merge'),
  Type.Literal('ramp'),
  Type.Literal('on ramp'),
  Type.Literal('off ramp'),
  Type.Literal('fork'),
  Type.Literal('end of road'),
  Type.Literal('use lane'),
  Type.Literal('continue'),
  Type.Literal('roundabout'),
  Type.Literal('rotary'),
  Type.Literal('roundabout turn'),
  Type.Literal('notification'),
  Type.Literal('exit roundabout'),
  Type.Literal('exit rotary')
])

type Indication = Static<typeof Indication>
const Indication = Type.Union([
  Type.Literal('uturn'),
  Type.Literal('sharp right'),
  Type.Literal('right'),
  Type.Literal('slight rigth'),
  Type.Literal('straight'),
  Type.Literal('slight left'),
  Type.Literal('left'),
  Type.Literal('sharp left')
])

type LineString = Static<typeof LineString>
const LineString = Type.Object({
  type: Type.Literal('LineString'),
  coordinates: Type.Array(Coordinate)
})

type Waypoint = Static<typeof Waypoint>
const Waypoint = Type.Object({
  hint: Type.String(),
  distance: Type.Number(),
  name: Type.String(),
  location: Coordinate
})

type Annotation = Static<typeof Annotation>
const Annotation = Type.Object({
  distance: Type.Array(Type.Number()),
  duration: Type.Array(Type.Number()),
  datasources: Type.Array(Type.Number()),
  nodes: Type.Array(Type.Number()),
  weight: Type.Array(Type.Number()),
  speed: Type.Array(Type.Number())
})

type StepManeuver = Static<typeof StepManeuver>
const StepManeuver = Type.Object({
  location: Coordinate,
  bearing_before: Type.Number(),
  bearing_after: Type.Number(),
  type: StepManeuverTypes,
  modifier: Indication
})

type Lane = Static<typeof Lane>
const Lane = Type.Object({
  indications: Type.Array(Indication),
  valid: Type.Boolean()
})

type Intersection = Static<typeof Intersection>
const Intersection = Type.Object({
  location: Coordinate,
  bearings: Type.Array(Type.Number()),
  classes: Type.Array(Type.String()),
  entry: Type.Array(Type.String()),
  in: Type.Number(),
  out: Type.Number(),
  lanes: Lane
})

type RouteStep = Static<typeof RouteStep>
const RouteStep = Type.Object({
  distance: Type.Number(),
  duration: Type.Number(),
  geometry: Type.Union([Polyline, LineString]),
  weight: Type.Number(),
  name: Type.String(),
  ref: Type.String(),
  pronunciation: Type.String(),
  destinations: Type.String(),
  exits: Type.String(),
  mode: Type.String(),
  maneuver: StepManeuver,
  intersections: Type.Array(Intersection),
  rotary_name: Type.String(),
  rotary_pronunciation: Type.String()
})

type RouteLeg = Static<typeof RouteLeg>
const RouteLeg = Type.Object({
  distance: Type.Number(),
  duration: Type.Number(),
  weight: Type.Number(),
  summary: Type.String(),
  steps: Type.Array(RouteStep),
  annotation: Annotation
})

type Route = Static<typeof Route>
const Route = Type.Object({
  distance: Type.Number(),
  duration: Type.Number(),
  geometry: Type.Optional(Type.Any()),
  weight: Type.Number(),
  weight_name: Type.String(),
  legs: Type.Array(RouteLeg)
})

type MatchWaypoint = Static<typeof MatchWaypoint>
const MatchWaypoint = Type.Intersect([
  Waypoint,
  Type.Object({
    matchings_index: Type.Array(Type.Number()),
    waypoint_index: Type.Array(Type.Number())
  })
])

type MatchRoute = Static<typeof MatchRoute>
const MatchRoute = Type.Intersect([
  Route,
  Type.Object({
    confidence: Type.Number()
  })
])

type TripWaypoint = Static<typeof TripWaypoint>
const TripWaypoint = Type.Intersect([
  Waypoint,
  Type.Object({
    trips_index: Type.Number(),
    waypoint_index: Type.Number()
  })
])

type Options = Static<typeof Options>
const Options = Type.Object({
  coordinates: Type.Optional(Type.Array(Coordinate)),
  bearings: Type.Optional(Type.Union([Type.Array(Bearing), Type.Null()])),
  radiuses: Type.Optional(Type.Union([Type.Array(Radius), Type.Null()])),
  hints: Type.Optional(Type.Array(Hint)),
  generate_hints: Type.Optional(Type.Boolean()),
  skip_waypoints: Type.Optional(Type.Boolean({ default: false }))
})

// type ConstructorOptions = Static<typeof ConstructorOptions>
// const ConstructorOptions = Type.Object({
//   algorithm: Type.Optional(AlgorithmTypes),
//   memory_file: Type.Optional(Type.String()),
//   mmap_memory: Type.Optional(Type.Boolean()),
//   max_locations_trip: Type.Optional(Type.Number()),
//   max_locations_viaroute: Type.Optional(Type.Number()),
//   max_locations_distance_table: Type.Optional(Type.Number()),
//   max_locations_map_matching: Type.Optional(Type.Number()),
//   max_results_nearest: Type.Optional(Type.Number()),
//   max_alternatives: Type.Optional(Type.Number())
// })

// type PathConstructorOptions = Static<typeof PathConstructorOptions>
// const PathConstructorOptions = Type.Intersect([
//   ConstructorOptions,
//   Type.Object({
//     path: Type.Optional(Type.String())
//   })
// ])

// type SharedMemoryConstructorOptions = Static<
//   typeof SharedMemoryConstructorOptions
// >
// const SharedMemoryConstructorOptions = Type.Intersect([
//   ConstructorOptions,
//   Type.Object({
//     shared_memory: Type.Optional(Type.Boolean()),
//     dataset_name: Type.Optional(Type.String())
//   })
// ])

type RouteOptionsType = Static<typeof RouteOptions>
const RouteOptions = Type.Intersect([
  Options,
  Type.Object({
    alternatives: Type.Optional(Type.Union([Type.Boolean(), Type.Number()])),
    steps: Type.Optional(Type.Boolean()),
    annotations: Type.Optional(
      Type.Union([
        Type.Boolean(),
        Type.Array(
          Type.Union([
            Type.Literal('duration'),
            Type.Literal('nodes'),
            Type.Literal('distance'),
            Type.Literal('weight'),
            Type.Literal('datasources'),
            Type.Literal('speed')
          ])
        )
      ])
    ),
    geometries: Type.Optional(GeometriesTypes),
    overview: Type.Optional(OverviewTypes),
    continue_straight: Type.Optional(Type.Boolean()),
    approaches: Type.Optional(
      Type.Union([Type.Array(ApproachTypes), Type.Null()])
    ),
    waypoints: Type.Optional(Type.Array(Type.Number())),
    snapping: Type.Optional(SnappingTypes),
    exclude: Type.Optional(Type.Array(Type.String()))
  })
])

type NearestOptionsType = Static<typeof NearestOptions>
const NearestOptions = Type.Intersect([
  Options,
  Type.Object({
    number: Type.Optional(Type.Number()),
    approaches: Type.Optional(
      Type.Union([Type.Array(ApproachTypes), Type.Null()])
    ),
    snapping: Type.Optional(SnappingTypes)
  })
])

type TableOptionsType = Static<typeof TableOptions>
const TableOptions = Type.Intersect([
  Options,
  Type.Object({
    sources: Type.Optional(Type.Array(Type.Number())),
    destinations: Type.Optional(Type.Array(Type.Number())),
    approaches: Type.Optional(Type.Union([ApproachTypes, Type.Null()])),
    fallback_speed: Type.Optional(Type.Number()),
    fallback_coordinate: Type.Optional(FallbackCoordinateTypes),
    scale_factor: Type.Optional(Type.Number()),
    snapping: Type.Optional(SnappingTypes),
    annotations: Type.Optional(
      Type.Array(
        Type.Union([Type.Literal('duration'), Type.Literal('distance')])
      )
    ),
    exclude: Type.Optional(Type.Array(Type.String())),
  })
])

type MatchOptionsType = Static<typeof MatchOptions>
const MatchOptions = Type.Intersect([
  Options,
  Type.Object({
    steps: Type.Optional(Type.Boolean()),
    annotations: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            Type.Literal('duration'),
            Type.Literal('nodes'),
            Type.Literal('distance'),
            Type.Literal('weight'),
            Type.Literal('datasources'),
            Type.Literal('speed')
          ])
        ),
        Type.Boolean()
      ])
    ),
    geometries: Type.Optional(GeometriesTypes),
    overview: Type.Optional(OverviewTypes),
    timestamps: Type.Optional(Type.Array(Type.Number())),
    radiuses: Type.Optional(Type.Array(Type.Number())),
    gaps: Type.Optional(GapTypes),
    tidy: Type.Optional(Type.Boolean()),
    waypoints: Type.Optional(Type.Array(Type.Number())),
    snapping: Type.Optional(SnappingTypes),
    exclude: Type.Optional(Type.Array(Type.String()))
  })
])

type TripOptionsType = Static<typeof TripOptions>
const TripOptions = Type.Intersect([
  Options,
  Type.Object({
    steps: Type.Optional(Type.Boolean()),
    annotations: Type.Optional(
      Type.Union([
        Type.Array(
          Type.Union([
            Type.Literal('duration'),
            Type.Literal('nodes'),
            Type.Literal('distance'),
            Type.Literal('weight'),
            Type.Literal('datasources'),
            Type.Literal('speed')
          ])
        ),
        Type.Boolean()
      ])
    ),
    geometries: Type.Optional(GeometriesTypes),
    overview: Type.Optional(OverviewTypes),
    roundtrip: Type.Optional(Type.Boolean()),
    source: Type.Optional(
      Type.Union([Type.Literal('any'), Type.Literal('first')])
    ),
    destination: Type.Optional(
      Type.Union([Type.Literal('any'), Type.Literal('last')])
    ),
    approaches: Type.Optional(Type.Union([ApproachTypes, Type.Null()])),
    snapping: Type.Optional(SnappingTypes),
    exclude: Type.Optional(Type.Array(Type.String()))
  })
])

type RouteResultsType = Static<typeof RouteResults>
const RouteResults = Type.Object({
  waypoints: Type.Array(Waypoint),
  routes: Type.Array(Route)
})

type NearestResultsType = Static<typeof NearestResults>
const NearestResults = Type.Object({
  waypoints: Type.Array(Waypoint)
})

type TableResultsType = Static<typeof TableResults>
const TableResults = Type.Object({
  durations: Type.Array(Type.Array(Duration)),
  distances: Type.Optional(Type.Array(Type.Array(Distance))),
  sources: Type.Array(Waypoint),
  destinations: Type.Array(Waypoint),
  fallback_speed_cells: Type.Optional(Type.Array(Type.Number()))
})

type MatchResultsType = Static<typeof MatchResults>
const MatchResults = Type.Object({
  tracepoints: Type.Array(MatchWaypoint),
  matchings: Type.Array(MatchRoute)
})

type TripResultsType = Static<typeof TripResults>
const TripResults = Type.Object({
  waypoints: Type.Array(TripWaypoint),
  trips: Type.Array(Route)
})

// type PluginConfig = Static<typeof PluginConfig>
// const PluginConfig = Type.Object({
//   format: Type.Optional(
//     Type.Union([Type.Literal('object'), Type.Literal('json_buffer')])
//   )
// })

export { 
    MatchOptions,
    MatchOptionsType,
    RouteOptions,
    RouteOptionsType,
    TripOptions,
    TripOptionsType,
    NearestOptions,
    NearestOptionsType,
    TableOptions,
    TableOptionsType,
    MatchResults,
    MatchResultsType,
    RouteResults,
    RouteResultsType,
    TripResults,
    TripResultsType,
    NearestResults,
    NearestResultsType,
    TableResults,
    TableResultsType,
    Tile,
    TileType
 }
