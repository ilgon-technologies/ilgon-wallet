export const STAKING = 'Staking';
export default [
  {
    name: STAKING,
    address: '0xebE14A98E366196f16529c5E9Ecfea43fbC9940b',
    abi: stakingAbi()
  }
];
function stakingAbi() {
  return [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'vaultId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'label',
          type: 'string'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'enum Staking.DepositType',
          name: 'depositType',
          type: 'uint8'
        }
      ],
      name: 'Deposit',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'vaultId',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'finalWithdraw',
          type: 'bool'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountWithdrawn',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'interestPaid',
          type: 'uint256'
        }
      ],
      name: 'Withdraw',
      type: 'event'
    },
    {
      stateMutability: 'payable',
      type: 'fallback'
    },
    {
      inputs: [],
      name: 'deposit',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        },
        {
          internalType: 'string',
          name: 'label',
          type: 'string'
        },
        {
          internalType: 'address',
          name: 'target',
          type: 'address'
        },
        {
          internalType: 'enum Staking.DepositType',
          name: 'depositType',
          type: 'uint8'
        },
        {
          internalType: 'uint8',
          name: 'stakingBonus',
          type: 'uint8'
        }
      ],
      name: 'depositAdmin',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'vaultId',
          type: 'uint256'
        }
      ],
      name: 'forceWithdraw',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address'
        }
      ],
      name: 'getAccumulatedVotingPower',
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
      name: 'getAdmins',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getAmountLimits',
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
      inputs: [],
      name: 'getAmountPremiums',
      outputs: [
        {
          internalType: 'uint8[]',
          name: '',
          type: 'uint8[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getMinDeposit',
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
          internalType: 'address',
          name: 'a',
          type: 'address'
        }
      ],
      name: 'getUserData',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'deposits',
              type: 'uint256'
            },
            {
              internalType: 'uint64',
              name: 'activityTime',
              type: 'uint64'
            },
            {
              internalType: 'uint64',
              name: 'lastVoteCalculated',
              type: 'uint64'
            },
            {
              internalType: 'uint256',
              name: 'votingPower',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'accumulatedVotingPower',
              type: 'uint256'
            }
          ],
          internalType: 'struct Staking.UserData',
          name: '',
          type: 'tuple'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'a',
          type: 'address'
        }
      ],
      name: 'getUserDeposits',
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
          internalType: 'address',
          name: 'target',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256'
        }
      ],
      name: 'getVaultById',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address'
            },
            {
              internalType: 'uint64',
              name: 'depositTime',
              type: 'uint64'
            },
            {
              internalType: 'uint64',
              name: 'withdrawTime',
              type: 'uint64'
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256'
            },
            {
              internalType: 'string',
              name: 'label',
              type: 'string'
            },
            {
              internalType: 'uint256',
              name: 'withdrawnAmount',
              type: 'uint256'
            },
            {
              internalType: 'enum Staking.DepositType',
              name: 'depositType',
              type: 'uint8'
            },
            {
              internalType: 'uint256',
              name: 'withdrawLimit',
              type: 'uint256'
            },
            {
              internalType: 'uint64',
              name: 'firstWithdrawTime',
              type: 'uint64'
            },
            {
              internalType: 'uint8',
              name: 'stakingBonus',
              type: 'uint8'
            }
          ],
          internalType: 'struct Staking.Vault',
          name: 'vault',
          type: 'tuple'
        },
        {
          internalType: 'uint256',
          name: 'interest',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'withdrawableAmount',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getVaultUsersLength',
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
          internalType: 'address',
          name: 'a',
          type: 'address'
        }
      ],
      name: 'getVaultsLength',
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
          internalType: 'address',
          name: 'target',
          type: 'address'
        }
      ],
      name: 'getVotingPower',
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
      name: 'isCompensationInterestGoing',
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
      name: 'newVotingRound',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'previousVoteTime',
      outputs: [
        {
          internalType: 'uint64',
          name: '',
          type: 'uint64'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_owner',
          type: 'address'
        }
      ],
      name: 'replaceOwner',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'sendToOwner',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'newAdmins',
          type: 'address[]'
        }
      ],
      name: 'setAdmins',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint8[]',
          name: 'newAmountPremiums',
          type: 'uint8[]'
        },
        {
          internalType: 'uint256[]',
          name: 'newAmountLimits',
          type: 'uint256[]'
        }
      ],
      name: 'setAmountLimitsAndPremiums',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'setMinDeposit',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'startTime',
      outputs: [
        {
          internalType: 'uint64',
          name: '',
          type: 'uint64'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'sumDeposits',
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
      name: 'toggleDepositOpen',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'vaultId',
          type: 'uint256'
        },
        {
          internalType: 'uint8',
          name: 'value',
          type: 'uint8'
        }
      ],
      name: 'updateStakingBonus',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'target',
          type: 'address'
        },
        {
          internalType: 'uint256',
          name: 'vaultId',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256'
        }
      ],
      name: 'updateWithdrawLimit',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      name: 'vaultUsers',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'voteTime',
      outputs: [
        {
          internalType: 'uint64',
          name: '',
          type: 'uint64'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'vaultId',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256'
        }
      ],
      name: 'withdraw',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      stateMutability: 'payable',
      type: 'receive'
    }
  ];
}
export const dummyAbi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'spender',
        type: 'address'
      },
      {
        name: 'tokens',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'from',
        type: 'address'
      },
      {
        name: 'to',
        type: 'address'
      },
      {
        name: 'tokens',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: '_totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'tokenOwner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'uint256'
      },
      {
        name: 'b',
        type: 'uint256'
      }
    ],
    name: 'safeSub',
    outputs: [
      {
        name: 'c',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'to',
        type: 'address'
      },
      {
        name: 'tokens',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'uint256'
      },
      {
        name: 'b',
        type: 'uint256'
      }
    ],
    name: 'safeDiv',
    outputs: [
      {
        name: 'c',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'spender',
        type: 'address'
      },
      {
        name: 'tokens',
        type: 'uint256'
      },
      {
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'approveAndCall',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'uint256'
      },
      {
        name: 'b',
        type: 'uint256'
      }
    ],
    name: 'safeMul',
    outputs: [
      {
        name: 'c',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'newOwner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'tokenAddress',
        type: 'address'
      },
      {
        name: 'tokens',
        type: 'uint256'
      }
    ],
    name: 'transferAnyERC20Token',
    outputs: [
      {
        name: 'success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'tokenOwner',
        type: 'address'
      },
      {
        name: 'spender',
        type: 'address'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        name: 'remaining',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'a',
        type: 'uint256'
      },
      {
        name: 'b',
        type: 'uint256'
      }
    ],
    name: 'safeAdd',
    outputs: [
      {
        name: 'c',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_from',
        type: 'address'
      },
      {
        indexed: true,
        name: '_to',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        name: 'tokens',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'tokenOwner',
        type: 'address'
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        name: 'tokens',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  }
];
