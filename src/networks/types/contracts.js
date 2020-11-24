export default [
  {
    name: 'Staking contract',
    address: '0x269BF6B66A87450a352118Ae52C38fe6B934b2Ec',
    comment: '',
    abi: [
      {
        inputs: [],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
      },
      {
        inputs: [],
        name: 'toggleDepositOpen',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor'
      },
      {
        stateMutability: 'payable',
        type: 'fallback'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'vaultId',
            type: 'uint256'
          }
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        stateMutability: 'payable',
        type: 'receive'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'principal',
            type: 'uint256'
          },
          {
            internalType: 'uint48',
            name: 'startTime',
            type: 'uint48'
          },
          {
            internalType: 'uint48',
            name: 'finishTime',
            type: 'uint48'
          }
        ],
        name: 'calculateInterest',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'deploymentTime',
        outputs: [
          {
            internalType: 'uint32',
            name: '',
            type: 'uint32'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'expiration',
        outputs: [
          {
            internalType: 'uint32',
            name: '',
            type: 'uint32'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'getCurrentRate',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'getMyVaultIds',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_timestamp',
            type: 'uint256'
          }
        ],
        name: 'getPersonalRate',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256'
          }
        ],
        name: 'getVaultById',
        outputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'uint48',
            name: 'depositTime',
            type: 'uint48'
          },
          {
            internalType: 'uint48',
            name: 'withdrawTime',
            type: 'uint48'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'interest',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'isDepositOpen',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'isInterestGoing',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'minDeposit',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ]
  }
];
