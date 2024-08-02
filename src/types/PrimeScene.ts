import { Point, Point3D } from './Point';
import { Size } from './Size';

export interface RootSceneContanier {
  Scene: PrimeScene;
}

export interface PrimeScene {
  Version: string;
  Revision: string;
  DisplayName: string;
  Name: string;
  Description: string | null;
  Keywords: string | null;
  CamioVirtualChannel: string | null;
  Channel: number;
  DefaultMessageId: string | null;
  UseRelativePaths: boolean;
  FontEngine: string;
  MissingAssetsBehavior: string;
  Actions: Actions;
  EffectIn: string | null;
  EffectOut: string | null;
  LayerIn: string | null;
  LayerOut: string | null;
  PreviewIn: string | null;
  UpdateBehavior: string;
  Canvas: Canvas;
  Resources: ObjectsContainer;
  Parameters: ObjectsContainer;
  Expressions: ObjectsContainer;
  Conditions: ObjectsContainer;
  CommandSequence: string | null;
  Replaceables: Replaceables;
  InvokeEvents: boolean;
}

export interface Text {
  Name: string;
  Opacity: number;
  RotationOrder: string;
  ProjectionCenter: Point;
  BlendingMode: string;
  PreviewOnly: string;
  Position: Point3D;
  Scale: Scale;
  Rotation: Point3D;
  Pivot: Point3D;
  Origin: Point;
  Size: Size;
  LockSizeAspect: boolean;
  Mode: string;
  HorizontalAlignment: string;
  VerticalAlignment: string;
  WordWrap: string;
  HorizontalScale: string;
  VerticalScale: string;
  Direction: string;
  Color: string;
  Font: Font;
  _2d: _2d;
  Style: string | null;
  UpdateTextSize: boolean;
  Text: string;
  Number: number;
  Format: number;
}

export interface Image {
  Name: string;
  Opacity: number;
  RotationOrder: string;
  ProjectionCenter: Point;
  BlendingMode: string;
  PreviewOnly: string;
  Position: Point3D;
  Scale: Scale;
  Rotation: Point3D;
  Pivot: Point3D;
  Origin: Point;
  Size: Size;
  LockSizeAspect: boolean;
  File: string | null;
  SizeMode: string;
  FileSize: Size;
  SuppressSizeMode: boolean;
  HideOnClear: boolean;
  TextureQuality: string;
  TextureWrap: string;
  ColorMode: string;
  Color: string;
  LinearStartColor: string;
  LinearFinishColor: string;
  Animations: Animations;
}

interface Font {
  Name: string;
  Size: number;
  Weight: string;
  Style: string;
  Stretch: string;
  TypefaceName: string;
  Color: string;
  Kerning: number;
  Leading: number;
  SpaceWidth: number;
  FixedPitch: number;
  LineSpacing: number;
  Vertical: boolean;
}

interface Actions {
  Action: Action[];
}

interface Action {
  Name: string;
}

interface Canvas {
  Opacity: number;
  RotationOrder: string;
  ProjectionCenter: Point;
  LightEnable: boolean;
  DepthFunction: string;
  BlendingMode: string;
  PreviewOnly: string;
  Position: Point3D;
  Scale: Scale;
  Rotation: Point3D;
  Pivot: Point3D;
  Resolution: Resolution;
  RegionOfInterest: RegionOfInterest;
  RulerGuides: ObjectsContainer;
  AutoPriority: boolean;
  Camera: string | null;
  UseFirstCamera: boolean;
  Layer: number;
  Graphics: Graphics
}

export interface Graphics {
  Text?: Text[] 
   Group?: Group[]
   Image?: Image[];
}

export interface Group {
  Name: string;
  Opacity: number;
  RotationOrder: string;
  ProjectionCenter: Point;
  BlendingMode: string;
  PreviewOnly: string;
  Position: Point3D;
  Scale: Scale;
  Rotation: Point3D;
  Pivot: Point3D;
  Graphics?: Graphics;
}

interface Scale extends Point3D {
  Link: boolean;
}

interface Resolution {
  Size: Size;
  FrameRate: string;
  PixelAspect: number;
}

interface RegionOfInterest {
  Enabled: boolean;
  Left: number;
  Top: number;
  Right: number;
  Bottom: number;
}

interface ObjectsContainer {
  Objects: string | null;
}

interface Replaceables {
  Naming: string;
  Indexing: string;
}

interface Animations {
  Animation: Animation[];
}

interface Animation {
  Name: string;
  Keyframe: Keyframe;
}

interface Keyframe {
  Frame: string;
}

interface _2d {
  Resolution: number;
  LockResolution: boolean;
  ColorMode: string;
  LinearStartColor: string;
  LinearFinishColor: string;
  Outline: Outline;
}

interface Outline {
  Enabled: boolean;
  Color: string;
  Size: number;
}
