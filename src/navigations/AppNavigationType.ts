import { SelectedMap } from "../../tmd/components/picker/MapPicker";
import { GalleryItem } from "../../tmd/types";
import { BahanModel, ListBahan } from "../models/spb/bahan";
import { IBahan } from "../screens/FormSPB";

type AppNavigationType = {
  //utils
  GalleryListScreen: {
    images: GalleryItem[],
    title?: string
  },
  MapPickerScreen: {
    onSelected: (selected: SelectedMap) => void;
    initial?: SelectedMap
  },
  //end utils
  HomePM: undefined,
  ListSPB: undefined,
  DetailSPB: undefined,
  DetailPO: undefined,
  FormSPB: undefined,
  AddBahan: {
    defaultBahan: BahanModel[],
  },
  ProjectDetail: undefined,
  StepperScreen: undefined,
  ImageScreen: undefined,
  SignatureCanvasScreen: undefined,
  ProgressBarScreen: undefined,
  MapTrackingScreen: undefined,
  LoginScreen: undefined,
  MainScreen: undefined,
  ImagePickerScreen: undefined,
  ButtonScreen: undefined,
  TypographyScreen: undefined,
  TextFieldScreen: undefined,
  PickerScreen: undefined,
  BottomSheetScreen: undefined,
  ModalScreen: undefined,
  TagScreen: undefined,
  AlertScreen: undefined,
  SelectorScreen: undefined,
  LanguageScreen: undefined,
  APIScreen: undefined,
  FetchDataScreen: undefined,
  PaginationScreen: undefined,
  ChipScreen: undefined,
  OTPScreen: undefined,
  FormScreen: undefined,
  LayoutScreen: undefined,
  TabScreen: undefined,
  AvatarScreen: undefined,
  BadgeScreen: undefined,
  TooltipScreen: undefined,
  TooltipStepperScreen: undefined,
  SkeletonScreen: undefined,
  DividerScreen: undefined,
};
export default AppNavigationType;
