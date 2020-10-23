export default [
  {
    name: 'Geza Gold',
    address: '0xe9dc25b5181dfef4cd0086112f1315378d9f9f8a',
    comment: '',
    abi: [
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
    ]
  },
  {
    name: 'Gyula Dollar',
    address: '0x2f2edd07e514ecba939a505c55cec77be35c4622',
    comment: '',
    abi: [
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
    ]
  },
  {
    name: 'Matias Silver Denarius',
    address: '0x2a2b8889c91c93a8aa7faccde444f510554b6b0f',
    abi: [
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
    ]
  },
  {
    name: 'Reka Diamond',
    address: '0xb0826feddafecb24bd319a365d41d44fde5064b6',
    comment: '',
    abi: [
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
    ]
  }
];
