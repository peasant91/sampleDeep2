import { number, string } from "yup";
import { ProjectModel } from "../../src/models/project/project";
import { PODetailModel, PoList } from "../../src/models/spb/po";
import { SPBDetailModel, SpbListItem } from "../../src/models/spb/spb";

/**
 * Created by Widiana Putra on 13/06/2022
 * Copyright (c) 2022 - Made with love
 */
const _mockStatus = [
  {
    id: 1,
    status: "Pending",
  },
];

const _spbMock: SpbListItem[] = [
  {
    project_id: 9381728,
    name: "PROJECT DUMMY",
    location: {
      address: "DI BALI TEMPATKU BERAKABUNG",
      lat: 8.7224,
      lng: 115.1767
    },
    no_spb: "SPB-392183291",
    created_at: "2022-08-20T15:31:58",
    spb_status: "waiting_confirmation",
    items: [
      {
        id: 0,
        name: "PIPA",
        quantity: 21,
        unit: "m"
      },

      {
        id: 1,
        name: "KELAPA",
        quantity: 111,
        unit: "butir"
      }
    ],
    total: 21
  },

  {
    project_id: 647328943,
    name: "PROJECT DUMMY",
    location: {
      address: "DI BALI TEMPATKU BERAKABUNG",
      lat: 8.7224,
      lng: 115.1767
    },
    no_spb: "SPB-2834382",
    created_at: "2022-08-20T15:31:58",
    spb_status: "approved",
    items: [
      {
        id: 0,
        name: "PIPA",
        quantity: 21,
        unit: "m"
      },

      {
        id: 1,
        name: "KELAPA",
        quantity: 111,
        unit: "butir"
      }
    ],
    total: 133
  }
]

const _poDetailMock: PODetailModel = {
  no_spb: "SPB-84392432",
  spb_created_at: "2022-08-20T15:31:58",
  no_po: "PO-8423943243",
  po_created_at: "2022-08-20T15:31:58",
  po_status: "done",
  supplier: {
    name: 'Timedoor',
    address: 'Indonesia alamatnya'
  },
  delivery_estimation: "2022-08-20T15:31:58",
  items: [
    {
      id: 0,
      name: "PIPA",
      quantity: 21,
      unit: "m"
    },
    {
      id: 1,
      name: "PLARON",
      quantity: 22,
      unit: "Truck"
    },

    {
      id: 2,
      name: "PLARON",
      quantity: 22,
      unit: "Truck"
    },

    {
      id: 3,
      name: "PLARON",
      quantity: 22,
      unit: "Truck"
    }
  ],
  total: 123
}

const _spbDetailMock: SPBDetailModel = {
  no_spb: "SPB-283438382",
  created_at: "2022-08-20T15:31:58",
  spb_status: "approved",
  items: [
    {
      id: 0,
      name: "PIPA",
      quantity: 21,
      unit: "m"
    },
    {
      id: 1,
      name: "PLARON",
      quantity: 22,
      unit: "Truck"
    },

    {
      id: 2,
      name: "PLARON",
      quantity: 22,
      unit: "Truck"
    },

    {
      id: 3,
      name: "PLARON",
      quantity: 22,
      unit: "Truck"
    }
  ],
  total: 0,
  image: "https://picsum.photos/300/200"
}

const _poListMock: PoList[] = [
  {
    id: 10,
    no_po: "03/AJU/Villa Melati/V/2022",
    created_at: "2022-08-20T15:31:58",
    po_status: "waiting_confirmation",
    items: [
      {
        id: 100,
        name: "Cement Putih",
        quantity: 6,
        unit: "Karung"
      },

      {
        id: 102,
        name: "Cement Hitam",
        quantity: 10,
        unit: "Kardus"
      }
    ],
    total: 202
  },
  {
    id: 12,
    no_po: "03/AJUM",
    created_at: "2022-08-20T15:31:58",
    po_status: "waiting_confirmation",
    items: [
      {
        id: 100,
        name: "Cement Putih",
        quantity: 6,
        unit: "Karung"
      },

      {
        id: 102,
        name: "Cement Hitam",
        quantity: 10,
        unit: "Kardus"
      }
    ],
    total: 202
  }
]

const _projectMock: ProjectModel = {
  name: "Proyek Kaliasem Bongkar trotoar yang masih mulus",
  created_at: "2022-08-20T15:31:58",
  construction_type: "Tipe Konstruksi",
  duration: "1 - 3 Bulan",
  description: "Lorem Ipsum, Trotoar mulus tapi dibongkar pertanda korupsi kolusi dan nepotisme yang strategis penuh dengan celah dan keuangan yang maut untuk sebagian orang",
  status: "in_progress",
  location: {
    address: "Jl Kaliasem",
    lat: 8.6864039,
    lng: 115.2316578
  },
  pm: ["Timedoor", "Indonesia"]
}

export { _mockStatus, _spbMock, _spbDetailMock, _projectMock, _poListMock, _poDetailMock};
